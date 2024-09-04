import { TextElementStyle, TextStyle, TextElement, Callout, Ordered } from "../../traverse/index.d";

export const getTextStyle = (d: TextStyle, isCode?: boolean) => {
  const obj = [];
  if (d?.align !== undefined && d?.align >= 1) {
    obj.push(`feishudocx-textstyle-align-${d.align}`);
  }
  if (isCode && d?.wrap) {
    obj.push('feishudocx-textstyle-wrap');
  }
  return obj;
}
export const getTextElementStyle = (d: TextElementStyle) => {
  const obj = [];
  if (d?.bold) {
    obj.push('feishudocx-textelementstyle-bold');
  }
  if (d?.background_color) {
    obj.push(`feishudocx-textelementstyle-bgcolor-${d.background_color}`);
  }
  if (d?.text_color) {
    obj.push(`feishudocx-textelementstyle-textcolor-${d.text_color}`);
  }
  if (d?.underline) {
    obj.push('feishudocx-textelementstyle-underline');
  }
  if (d?.italic) {
    obj.push('feishudocx-textelementstyle-italic');
  }
  if (d?.strikethrough) {
    obj.push('feishudocx-textelementstyle-strikethrough');
  }
  if (d?.inline_code) {
    obj.push('feishudocx-textelementstyle-inlinecode');
  }
  if (d?.inline_code_first) {
    obj.push('feishudocx-textelementstyle-inlinecode-first');
  }
  if (d?.inline_code_last) {
    obj.push('feishudocx-textelementstyle-inlinecode-last');
  }
  if (d?.link) {
    obj.push('feishudocx-textelementstyle-link');
  }
  return obj;
}
export const formatInlinecode = (elements: TextElement[]) => {
  elements.forEach((el, index) => {
    if (!!el.text_run?.text_element_style?.inline_code) {
      if (!elements[index - 1]?.text_run?.text_element_style?.inline_code) {
        el.text_run.text_element_style.inline_code_first = true;
      }
      if (!elements[index + 1]?.text_run?.text_element_style?.inline_code) {
        el.text_run.text_element_style.inline_code_last = true;
      }
    }
  });
}
export const formatOrderNum = (data?: Ordered) => {
  if (!data) {
    return null;
  }
  if (!data.parentNode) {
    return null;
  }
  let num = 0;
  for (const d of data.parentNode.childrenNodes || []) {
    if (d?.block_type === 13) {
      num += 1;
    } else if (d?.block_type === 2 && d?.text.elements[0].text_run?.content.includes("  ")){
      continue;
    } else {
      num = 0;
    }
    if (data?.block_id === d?.block_id) {
      break;
    }
  }
  return num;
}
export const getCalloutStyle = (d: Callout) => {
  const obj = [];
  obj.push(`feishudocx-calloutstyle-bgcolor-${d.callout?.background_color || 2}`);
  obj.push(`feishudocx-calloutstyle-bdcolor-${d.callout?.border_color || 2}`);
  if (d.callout?.text_color) {
    obj.push(`feishudocx-textelementstyle-textcolor-${d.callout?.text_color}`);
  }
  return obj;
}