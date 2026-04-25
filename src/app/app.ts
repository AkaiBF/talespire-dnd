import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { Skill } from './types/skill';
import { Option } from './types/option';
import { SizePresetList } from './constants/size';
import { AlignmentPresetList } from './constants/alignment';
import { ClassPresetList } from './constants/class';
import { SkillPresetList } from './constants/skill';
import { CharacterPreset } from './constants/character';
import { ToastModule } from 'primeng/toast';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { SpeciesPresetList } from './constants/specie';
import { BackgroundPresetList } from './constants/background';

@Component({
  selector: 'app-root',
  imports: [InputTextModule, FloatLabelModule, CardModule, InputNumberModule, FormsModule, CheckboxModule, SelectModule, FluidModule, ButtonModule, ToastModule, TextareaModule],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  @ViewChild('portraitContainer', { static: false })
  portraitContainer?: ElementRef<HTMLDivElement>;

  private _messageService: MessageService = inject(MessageService);

  newCharacter: string = "";
  initialized: boolean = false;

  protected readonly title = signal('DnD');
  character = CharacterPreset;
  skillList: Skill[] = [];
  weaponList: any[] = [];
  spellAbilityOptions: Option[] = []
  speciesOptions: Option[] = SpeciesPresetList;
  backgroundOptions: Option[] = BackgroundPresetList;
  classOptions: Option[] = ClassPresetList;
  alignmentOptions: Option[] = AlignmentPresetList;
  sizeOptions: Option[] = SizePresetList;
  spellList: any[] = []

  constructor() {
    window.handleSymbioteState = this.handleSymbioteState.bind(this);
    this.loadSkills();
  }

  private get TS(): any {
    return window.TS ?? window.com?.bouncyrock?.talespire;
  }

  handleSymbioteState(event: any): void {
    if (event?.kind === 'hasInitialized' || event?.type === 'hasInitialized') {
      this.initialized = true;
    }
  }

  async getAssetId(): Promise<void> {
    try {

      const selected = await this.TS.creatures.getSelectedCreatures();
      if (!selected?.length) {
        this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Selecciona una criatura para obtener su Asset ID' });
        return;
      }
      const info = await this.TS.creatures.getMoreInfo(selected);
      const assetId = info[0].morphs[info[0].activeMorphIndex].boardAssetId;

      this.newCharacter = assetId;
    } catch (error: any) {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener Asset ID: ' + error });
    }
  }

  async setPortrait(): Promise<void> {

    const packs = await this.TS.contentPacks.getContentPacks();
    const packsInfo = await this.TS.contentPacks.getMoreInfo(packs);

    const boardObjectInfo =
      await this.TS.contentPacks.findBoardObjectInPacks(
        this.character.portrait,
        packsInfo
      );

    const thumbnailElement =
      await this.TS.contentPacks.createThumbnailElementForBoardObject(
        boardObjectInfo.boardObject,
        128
      );

    const container = this.portraitContainer?.nativeElement;
    container!.innerHTML = '';
    container!.appendChild(thumbnailElement);

  }

  async spawn(): Promise<void> {
    const board = await this.TS.boards.whereAmI();
    const me = await this.TS.clients.whoAmI();
    try {
      const assetId = this.newCharacter + "";
      const creatureInfo = {
        id: "",
        isUnique: false,
        name: this.character.name,
        nameSet: true,
        link: '',
        position: { locId: 1, x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        boardId: board.id,
        morphs: [
          {
            boardAssetId: this.character.portrait !== "" ? this.character.portrait : assetId,
            scale: 1
          }
        ],
        activeMorphIndex: 0,
        hp: { name: 'hp', value: this.character.hp.current, max: this.character.hp.max },
        stats: [
          { name: 'STR', value: this.character.abilities.str.score, max: 24 },
          { name: 'DEX', value: this.character.abilities.dex.score, max: 24 },
          { name: 'CON', value: this.character.abilities.con.score, max: 24 },
          { name: 'INT', value: this.character.abilities.int.score, max: 24 },
          { name: 'WIS', value: this.character.abilities.wis.score, max: 24 },
          { name: 'CHA', value: this.character.abilities.cha.score, max: 24 },
          { name: "Stat 7", value: 0, max: 24 },
          { name: "Stat 8", value: 0, max: 24 },
        ],
        torchIsOn: false,
        isExplicitlyHidden: false,
        isFlying: false,
        idsOfActivePersistentEmotes: [],
        ownerIds: []
      };

      this.newCharacter = JSON.stringify(creatureInfo);
      const blueprintUrl = await this.TS.creatures.createBlueprint(creatureInfo);
      await this.TS.urls.submit(blueprintUrl);
      this.newCharacter = '';
    } catch (error: any) {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al spawnear criatura: ' + error });
    }
  }

  loadSkills(): void {
    this.skillList = SkillPresetList.map(skill => {
      const charSkill = this.character.skills.find(s => s.key === skill.key);
      const newSkill: Skill = {
        ...skill,
        proficient: charSkill ? charSkill.proficient : false,
        expertise: charSkill ? charSkill.expertise : false,
        bonus: 0
      }
      newSkill.bonus = this.calculateSkillBonus(newSkill);
      return newSkill;
    })
  }

  calculateSkillBonus(skill: Skill): number {
    const abilityMod = this.character.abilities[skill.ability as keyof typeof this.character.abilities].mod;
    const proficiencyBonus = this.character.proficiencyBonus;
    if (skill.expertise) {
      return abilityMod + (proficiencyBonus * 2);
    } else if (skill.proficient) {
      return abilityMod + proficiencyBonus;
    } else {
      return abilityMod;
    }
  }

  async rollSkill(skill: Skill): Promise<void> {
    try {
      if (!this.TS || !this.initialized) {
        return;
      }

      const bonus = skill.bonus >= 0 ? `+${skill.bonus}` : skill.bonus.toString();

      const descriptors = await this.TS.dice.makeRollDescriptors("1d20" + bonus);
      descriptors[0].name = skill.label;

      await this.TS.dice.putDiceInTray(descriptors, false);
    } catch (error: any) { }
  }

  importCharacter(): void {
    try {
      this.character = JSON.parse(this.newCharacter);
      this.loadSkills();
      this.newCharacter = '';
      if (this.character.portrait) {
        this.setPortrait();
      }
    } catch (error) {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al importar personaje: ' + error });
    }
  }

  copyToClipboard(): void {
    const characterData = JSON.stringify(this.character);
    navigator.clipboard.writeText(characterData).then(() => {
      this._messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Personaje copiado al portapapeles' });
    }).catch(err => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al copiar al portapapeles: ' + err });
    });
  }

}