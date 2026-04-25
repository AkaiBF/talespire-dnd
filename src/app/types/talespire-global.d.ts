declare global {
  interface Window {
    TS?: any;
    com?: {
      bouncyrock?: {
        talespire?: any;
      };
    };
    handleSymbioteState?: (event: any) => void;
    handleDiceResults?: (event: any) => void;
    handleCreatureSelection?: (event: any) => void;
  }
}

export { };