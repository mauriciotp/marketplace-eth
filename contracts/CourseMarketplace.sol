// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
  enum State {
    Purchased,
    Activated,
    Deactivated
  }

  struct Course {
    uint256 id;
    uint256 price;
    bytes32 proof;
    address owner;
    State state;
  }

  mapping(bytes32 => Course) private ownedCourses;

  mapping(uint256 => bytes32) private ownedCourseHash;

  uint256 private totalOwnedCourses;

  function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
    bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

    uint256 id = totalOwnedCourses++;
    ownedCourseHash[id] = courseHash;
    ownedCourses[courseHash] = Course({
      id: id,
      price: msg.value,
      proof: proof,
      owner: msg.sender,
      state: State.Purchased
    });
  }
}
