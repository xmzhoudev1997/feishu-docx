import React, { FC, ReactNode, memo } from 'react';
import { TipBlock } from "../../../traverse/index.d";
import classNames from 'classnames';
import './index.less';
import { renderSwitch } from '../..';

type Props = {
  data?: TipBlock;
  render?: (name: string, data: any, tsx: ReactNode) => ReactNode;
  onLink?: (link: string) => void;
  
}

export default memo((({
  data, render, onLink,
}) => {
  const tsx = data ? (
    <div
      key={data.block_id}
      id={data.block_id}
      className={classNames(
        'feishudocx-tipblock',
      )}
    >
      <div className={`feishudocx-tipblock-title ${!data?.childrenNodes?.length ? 'feishudocx-tipblock-title-only' : ''}`}>{data?.text?.elements?.[0]?.text_run?.content}</div>
      {data?.childrenNodes?.map(d => renderSwitch(d, render, onLink))}
    </div>
  ) : null;
  return render ? render('TipBlock', data, tsx) || null : tsx;
}) as FC<Props>)