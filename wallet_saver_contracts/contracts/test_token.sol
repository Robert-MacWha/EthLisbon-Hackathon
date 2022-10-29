pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract test_token is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("test_token", "TT") {}
}
