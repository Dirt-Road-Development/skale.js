import * as General from './constants';
import * as Mainnet from './mainnet';
import * as Schain from './predeployed';
import * as Staging from './staging-v3';

const Addresses = {
    ...General,
    Mainnet,
    Staging,
    Schain
};

export {
    Addresses,
    Mainnet,
    Schain,
    Staging
}

