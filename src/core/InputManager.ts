export default class Input {
    public static readonly state : Map<string, boolean> = new Map<string, boolean>;

    public static isLeftMouseDown: boolean = false;

    
    public static initialize() : void{
        document.addEventListener('keydown', Input.keyDown);
        document.addEventListener('keyup', Input.keyUp);
        document.addEventListener('mousedown', Input.mouseDown);
        document.addEventListener('mouseup', Input.mouseUp);
    }

    private static keyDown(e: KeyboardEvent): void{
        Input.state.set(e.key, true);
    }

    private static keyUp(e: KeyboardEvent): void{
        Input.state.set(e.key, false);
    }

    private static mouseDown(e: MouseEvent): void {
        Input.state.set(e.button.toString(), true);
    
    }
    private static mouseUp(e: MouseEvent):void {
        Input.state.set(e.button.toString(), false);
    }

    public static update(_delta : number) {
        Input.isLeftMouseDown = Input.state.get('0') ? true : false;
    }
}