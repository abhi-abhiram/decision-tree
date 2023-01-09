import { graphlib, layout } from 'dagre';

type Node = {
  id: string;
  children?: Node[];
};

export default function getLayout(width: number, height: number, root: Node) {
  const g = new graphlib.Graph<Node>();

  g.setGraph({
    rankdir: 'LR',
  });

  g.setDefaultEdgeLabel(function () {
    return {};
  });

  function addNode(node: Node) {
    g.setNode(node.id, {
      label: node.id,
      width: 144,
      height: 100,
    });

    if (node.children) {
      node.children.forEach((child) => {
        g.setEdge(node.id, child.id);
        addNode(child);
      });
    }
  }

  addNode(root);

  g.graph().width = width;
  g.graph().height = height;

  layout(g);

  return g.nodes().map((val) => {
    return {
      id: val,
      x: g.node(val).x,
      y: g.node(val).y,
      width: g.node(val).width,
      height: g.node(val).height,
    };
  });
}
