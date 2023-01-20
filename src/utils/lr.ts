import type { FieldProperties, FormField, InputFieldType } from '@/gql/graphql';
import { graphlib, layout } from 'dagre';
import type { Edge, Node } from 'reactflow';
import { Position } from 'reactflow';

export default function getLayout<T>(
  nodes: Node<T>[],
  edges: Edge[],
  nodeHeight: number,
  nodeWidth: number
): Node<T>[] {
  const g = new graphlib.Graph<Node>();

  g.setGraph({
    rankdir: 'LR',
  });

  g.setDefaultEdgeLabel(function () {
    return {};
  });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  g.graph().ranksep = 50;
  g.graph().nodesep = 50;

  layout(g);

  nodes.forEach((node) => {
    const nodeWithPosition = g.node(node.id);
    node.targetPosition = Position.Left;
    node.sourcePosition = Position.Right;

    node.position = {
      x: nodeWithPosition.x,
      y: nodeWithPosition.y,
    };

    return node;
  });

  return nodes;
}

export function FieldToNodes(
  field: FormField
): Node<FieldProperties & { type: InputFieldType }> {
  return {
    data: { ...field.properties, type: field.type },
    id: field._id,
    position: {
      x: 0,
      y: 0,
    },
    type: 'custom',
  };
}
