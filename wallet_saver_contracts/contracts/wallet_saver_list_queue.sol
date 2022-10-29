pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract wallet_saver_queue {
    address public owner;
    bytes32[] public tx_content_hashes;
    uint256[] public block_time_startes;
    uint256 time_delay;
    address panic_address;
    address[] erc20s;

    IERC20 public token;

    modifier _is_owner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
        uint256 _time_delay,
        address _panic_address,
        address[] memory _erc20s
    ) {
        owner = msg.sender;
        time_delay = _time_delay;
        panic_address = _panic_address;
        erc20s = _erc20s;
    }

    function queue(
        address payable _to,
        uint256 _value,
        bytes memory _data
    ) public _is_owner {
        block_time_startes.push(block.timestamp);
        tx_content_hashes.push(keccak256(abi.encodePacked(_to, _value, _data)));
    }

    function execute_call(
        address payable _to,
        uint256 _value,
        bytes memory _data
    ) public payable _is_owner {
        bool found_something = false;
        for (uint8 i; i < block_time_startes.length; i++) {
            if (
                keccak256(abi.encodePacked(_to, _value, _data)) ==
                tx_content_hashes[i]
            ) {
                require(
                    block.timestamp > block_time_startes[i] + time_delay,
                    "You can only execute after the time delay"
                );
                (bool success, bytes memory result) = _to.call{value: _value}(
                    _data
                );
                require(success, "something went wrong - tx failed");
                delete tx_content_hashes[i];
                delete block_time_startes[i];
                found_something = true;
            }
        }
        require(found_something == true, "contents of the transaction changed");
    }

    function revert_all_txns() public _is_owner {
        for (uint8 i; i < block_time_startes.length; i++) {
            block_time_startes[i] = 99999999999999999999999999999999;
            tx_content_hashes[i] = bytes32(0);
        }
    }

    function add_tokens(address[] memory _erc20s) public _is_owner {
        for (uint8 i; i < _erc20s.length; i++) {
            erc20s.push(_erc20s[i]);
        }
    }

    function panic() public _is_owner {
        (bool success, bytes memory result) = panic_address.call{
            value: address(this).balance
        }("");
        for (uint8 i; i < erc20s.length; i++) {
            IERC20(erc20s[i]).transfer(
                panic_address,
                IERC20(erc20s[i]).balanceOf(address(this))
            );
        }
    }

    // function change_owner(address new_owner) public _is_owner {
    //     owner = new_owner;
    // }

    receive() external payable {}
}
