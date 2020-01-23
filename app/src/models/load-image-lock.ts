export default class LoadImageLock {

    constructor(private _lock = false) {}

    lock() {
        this._lock = true;
    }

    unlock() {
        this._lock = false;
    }

    isLocked() {
        return true === this._lock;
    }
}
