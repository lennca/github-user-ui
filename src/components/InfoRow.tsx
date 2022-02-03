import React from 'react'

type Props = {
  text: string | undefined
  Element: any
  isLink: boolean
}

function InfoRow({ text, Element, isLink }: Props) {
  if (!text)
    return (
      <div className='flex items-center mb-1'>
        <Element className='h-4 w-4 mr-1 text-github-primary' />
        <p>-</p>
      </div>
    )

  return (
    <div className='flex items-center mb-1'>
      <Element className='h-4 w-4 mr-1 text-github-primary' />
      {isLink ? (
        <a
          className='text-github-primary hover:text-github-secondary cursor-pointer'
          href={text}
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
