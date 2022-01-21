import { arrangeChildrenInner } from '../arrangeChildren'
import { getCurrentVFragmentNode } from '../createComponent/componentContext'
import { ShrioFragment } from './shrioFragment/shrioFragment'
export const Fragment = (props: null, childNodes: TElementValue[]) => {
  const vFragmentNode = getCurrentVFragmentNode()
  if (!vFragmentNode.node) {
    vFragmentNode.node = new ShrioFragment()
  }

  const shrioFragmentChildrenNodes = childNodes.filter(
    (child) => child instanceof ShrioFragment,
  ) as unknown[] as ShrioFragment[]

  vFragmentNode.node.reloadChildren = () => {
    shrioFragmentChildrenNodes.forEach((fragment) => {
      fragment.reloadChildren!()
    })
    arrangeChildrenInner(vFragmentNode.node!, childNodes)
    return vFragmentNode.node as unknown as any
  }

  arrangeChildrenInner(vFragmentNode.node, childNodes)

  return vFragmentNode.node
}