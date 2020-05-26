export interface TreeNode {
    symbols: Array<string>;
    weight: number;
    leafs: Array<TreeNode>;
}
