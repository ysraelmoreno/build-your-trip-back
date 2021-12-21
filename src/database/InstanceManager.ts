class InstanceManager {
  protected _instances: Record<string, any> = {};

  constructor() {
    this._instances = {};
  }

  verifyInstance(name: string) {
    if (!this._instances[name]) {
      throw new Error(`Instance ${name} not found`);
    }
  }

  setInstance(name = "default", instance: any) {
    this._instances = {
      ...this._instances,
      [name]: instance,
    };
  }

  getInstance(name: string) {
    const instance = this._instances[name];

    this.verifyInstance(name);

    return instance;
  }
}

export default new InstanceManager();
