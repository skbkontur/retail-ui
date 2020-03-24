import {
  FiasAddressObject,
  FiasEstateStatuses,
  FiasId,
  FiasObject,
  FiasHouse,
  FiasStead,
  FiasRoom,
  FiasStructureStatuses,
} from '../types';

export class FiasData {
  public static isAddressObject = (data: FiasObject): data is FiasAddressObject => {
    return (
      data &&
      Object.prototype.hasOwnProperty.call(data, 'name') &&
      Object.prototype.hasOwnProperty.call(data, 'abbreviation')
    );
  };

  public static isStead = (data: FiasObject): data is FiasStead => {
    return (
      data &&
      Object.prototype.hasOwnProperty.call(data, 'number') &&
      Object.prototype.hasOwnProperty.call(data, 'liveStatus') &&
      !Object.prototype.hasOwnProperty.call(data, 'estateStatus')
    );
  };

  public static isHouse = (data: FiasObject): data is FiasHouse => {
    return (
      data &&
      Object.prototype.hasOwnProperty.call(data, 'structureStatus') &&
      (Object.prototype.hasOwnProperty.call(data, 'number') ||
        Object.prototype.hasOwnProperty.call(data, 'structureNumber'))
    );
  };

  public static isRoom = (data: FiasObject): data is FiasRoom => {
    return (
      data &&
      Object.prototype.hasOwnProperty.call(data, 'flatType') &&
      Object.prototype.hasOwnProperty.call(data, 'flatNumber') &&
      Object.prototype.hasOwnProperty.call(data, 'liveStatus')
    );
  };

  constructor(public data: FiasObject) {}

  public get name(): string {
    const { data } = this;
    if (FiasData.isAddressObject(data)) {
      return data.name;
    } else if (FiasData.isStead(data)) {
      return data.number;
    } else if (FiasData.isHouse(data)) {
      return data.number || data.structureNumber || data.buildingNumber || '';
    } else if (FiasData.isRoom(data)) {
      return data.flatNumber;
    }
    return '';
  }

  public get abbreviation(): string {
    return FiasData.isAddressObject(this.data) ? this.data.abbreviation : '';
  }

  public get code(): string {
    return (FiasData.isAddressObject(this.data) && this.data.code) || '';
  }

  public get number(): string {
    return (FiasData.isStead(this.data) || FiasData.isHouse(this.data)) && this.data.number ? this.data.number : '';
  }

  public get structureNumber(): string {
    return FiasData.isHouse(this.data) && this.data.structureNumber ? this.data.structureNumber : '';
  }

  public get buildingNumber(): string {
    return FiasData.isHouse(this.data) && this.data.buildingNumber ? this.data.buildingNumber : '';
  }

  public get fiasId(): FiasId {
    return this.data.fiasId;
  }

  public get parentFiasId(): FiasId {
    return (this.data && this.data.parentFiasId) || '';
  }

  public get postalCode(): string {
    return (this.data && this.data.postalCode) || '';
  }

  public get estateStatus(): FiasEstateStatuses | undefined {
    if (FiasData.isHouse(this.data)) {
      return this.data.estateStatus;
    }
  }

  public get structureStatus(): FiasStructureStatuses | undefined {
    if (FiasData.isHouse(this.data)) {
      return this.data.structureStatus;
    }
  }
}
