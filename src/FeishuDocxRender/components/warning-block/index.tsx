import React, { FC, ReactNode, memo } from 'react';
import { WarningBlock, Block } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: WarningBlock;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  dataMap?: Record<string, Block>;
}

export default memo((({
  data, render, onLink, dataMap = {},
}) => {
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-warningblock',
      )}
    >
      <div className="feishudocx-warningblock-title">{data?.text?.elements?.[0]?.text_run?.content}</div>
      {data?.children?.map(d => renderSwitch(dataMap[d], dataMap, render, onLink))}
    </div>
  ) : null;
  return render ? render('WarningBlock', data, tsx) || null : tsx;
}) as FC<Props>)