// input [ 3, 9, 1, null, null, 7, 17 ]

//     3
//    / \
//   9   1
//      / \
//     7   17

// {
//   val: 3,
//   left: {
//     val: 9,
//     left: null,
//     right: null
//   },
//   right: {
//     val: 1,
//     left: {
//       val: 7,
//       left: null,
//       right: null
//     },
//     right: {
//       val: 17,
//       left: null,
//       right: null
//     }
//   }
// }

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

function arrayToBinaryTree(array) {
  const stack = [];
  let ret = array.shift();
  let count = 1;

  do {
    stack.push(...array.splice(0, count *= 2));
  } while (array.length !== 0);

  return loop(ret, stack);

  function loop(root, list) {
    const node = new TreeNode(root);
    const unit = Math.abs(list.length % 2 - 1);

    if (list.length <= 2) {
      node.left = list[0] ? new TreeNode(list[0]) : null;
      node.right = list[1] ? new TreeNode(list[1]) : null;

      return node;
    }

    const leaf = list.splice(0, Math.round(list.length / 2) - unit);
    const left = list.splice(0, Math.round(list.length / 2));
    const right = list;

    node.left = loop(leaf[0], left);
    node.right = loop(leaf[1], right);

    return node;
  }
}

exports = {
  arrayToBinaryTree
}
