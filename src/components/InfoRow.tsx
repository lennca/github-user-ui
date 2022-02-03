import React, { ComponentProps, FunctionComponent } from 'react'
import PrefixUrl from '../utils/PrefixUrl'

type Props = {
  text: string | undefined
  Element: FunctionComponent<ComponentProps<'svg'>>
  isLink: boolean
}

function InfoRow({ text, Element, isLink }: Props) {
  if (!text) {
    return (
      <div className='flex items-center mb-1'>
        <Element className='h-4 w-4 mr-1 text-grey-1' />
        <p>-</p>
      </div>
    )
  }

  return (
    <div className='flex items-center mb-1'>
      <Element className='h-4 w-4 mr-1 text-grey-1' />
      {isLink ? (
        <a
          className='text-grey-1 hover:text-grey-2 cursor-pointer'
          href={PrefixUrl(text)}
          target='_blank'
          rel='noreferrer'>
          {text}
        </a>
      ) : (
        <p>{text}</p>
      )}
    </div>
  )
}

export default InfoRow
