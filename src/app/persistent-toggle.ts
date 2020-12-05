export class PersistentToggle {
  private value: boolean;

  get enabled() {
    return this.value;
  }

  constructor(private name: string) {
    this.value = localStorage.getItem(this.name) == 'true';
  }

  toggle(value: boolean = !this.value) {
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
