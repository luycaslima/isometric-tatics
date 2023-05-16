export default class InputManager {
    public static readonly state : Map<string, boolean> = new Map<string, boolean>;

    public static initialize() : void{
        document.addEventListener('keydown', InputManager.keyDown);
        document.addEventListener('keyup', InputManager.keyUp);
    }

    private static keyDown(e: KeyboardEvent): void{
        InputManager.state.set(e.key, true);
    }

    private static keyUp(e: KeyboardEvent): void{
        InputManager.state.set(e.key, false);
    }
}