export class PersistentToggle {
    constructor(name) {
        this.name = name;
        this.value = localStorage.getItem(this.name) == 'true';
    }
    get enabled() {
        return this.value;
    }
    get disabled() {
        return !this.enabled;
    }
    toggle(value = !this.value) {
        this.value = value;
        this.save();
    }
    enable() {
        this.toggle(true);
    }
    disable() {
        this.toggle(true);
    }
    save() {
        localStorage.setItem(this.name, String(this.value));
    }
}
