export default class ModalManager {
	private _show : boolean;

	constructor (show : boolean) {
		this._show = show;
	}
	get show () : boolean {
		return this._show;
	}
	control (show : boolean, setStage : React.Dispatch<React.SetStateAction<ModalManager>>) : void {
		setStage((previous : ModalManager) => new ModalManager(show))
	}

	toggle (setStage : React.Dispatch<React.SetStateAction<ModalManager>>) : void {
		setStage((previous : ModalManager) => new ModalManager(!previous.show));
	}
}
