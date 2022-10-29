pragma solidity ^0.8.0;

contract wallet_saver {
    address public owner;
    bytes32 tx_content_hash;
    uint256 block_time_start;
    uint256 time_delay;

    modifier _is_owner() {
        require(msg.sender == owner);
        _;
    }

    constructor(uint256 _time_delay) {
        owner = msg.sender;
        time_delay = _time_delay;
    }

    function queue(
        address payable _to,
        uint256 _value,
        bytes memory _data
    ) public _is_owner {
        block_time_start = block.timestamp;
        tx_content_hash = keccak256(abi.encodePacked(_to, _value, _data));
    }

    function execute_call(
        address payable _to,
        uint256 _value,
        bytes memory _data
    ) public payable _is_owner {
        // require()
        (bool success, bytes memory result) = _to.call{value: _value}(_data);
        require(success, "something went wrong - tx failed");
    }

    // function revert() {}

    // function panic() {}

    // function change_owner(address new_owner) public _is_owner {
    //     owner = new_owner;
    // }

    receive() external payable {}
}
