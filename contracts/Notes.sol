// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Notes {
	// Token name
	string private _name;

	// Token symbol
	string private _symbol;

	constructor() {
		_name = "Notes";
		_symbol = "NOTES";
	}

	function name() public view virtual returns (string memory) {
			return _name;
	}

	function symbol() public view virtual returns (string memory) {
			return _symbol;
	}

	struct Note {
		string title;
		string content;
	}

	// Token creation event
	event Created(address owner, uint256 tokenId);

	// Array with all token ids, used for enumeration
	uint256[] private _allTokens;

	// Mapping from token ID to owner address
	mapping(uint256 => address) private _owners;

	// Mapping owner address to token count
	mapping(address => uint256) private _balances;

	// Mapping token id to token
	mapping(uint256 => Note) public tokenIdToNoteInfo;

	// Mapping owner address to token list
	mapping(address => uint256[]) public userToTokenIdListInfo;

	function notesByOwner(address owner) public view returns(Note[] memory) {
		uint256 userBalance = balanceOf(owner);
		Note[] memory userNotes = new Note[](userBalance);
		for(uint256 i=0; i<userBalance; i++) {
			userNotes[i] = tokenIdToNoteInfo[userToTokenIdListInfo[owner][i]];
		}
		return userNotes;
	}

	function createNote(string memory _title, string memory _content) public {
		Note memory newNote = Note(_title, _content);
		uint256 tokenId = _allTokens.length;
		_allTokens.push(tokenId);
		tokenIdToNoteInfo[tokenId] = newNote;
		userToTokenIdListInfo[msg.sender].push(tokenId);
		_balances[msg.sender] += 1;
		_owners[tokenId] = msg.sender;

		emit Created(msg.sender, tokenId);
	}

	function totalSupply() public view returns (uint256) {
		return _allTokens.length;
	}

	function tokenIds() public view returns (uint256[] memory) {
		return _allTokens;
	}

	function balanceOf(address owner) public view virtual returns (uint256) {
		require(owner != address(0), "Notes: balance query for the zero address");
		return _balances[owner];
	}

	function ownerOf(uint256 tokenId) public view virtual returns (address) {
		address owner = _owners[tokenId];
		return owner;
	}
}
