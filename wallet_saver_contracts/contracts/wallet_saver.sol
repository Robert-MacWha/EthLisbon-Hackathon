pragma solidity ^0.8.0;

contract wallet_saver {
    address public owner;
    bytes32 tx_content_hash;
    uint256 block_time_start;
    uint256 time_delay;
    address panic_address;

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
        require(
            block.timestamp > block_time_start + time_delay,
            "You can only execute after the time delay"
        );
        require(
            keccak256(abi.encodePacked(_to, _value, _data)) == tx_content_hash
        );
        (bool success, bytes memory result) = _to.call{value: _value}(_data);
        require(success, "something went wrong - tx failed");
    }

    function revert_txn() public _is_owner {
        block_time_start = 999999999999999999999999999999999999;
        tx_content_hash = bytes32(0);
    }

    function panic() public _is_owner {

        panic_address
    }

    

    // function change_owner(address new_owner) public _is_owner {
    //     owner = new_owner;
    // }

    receive() external payable {}
}
