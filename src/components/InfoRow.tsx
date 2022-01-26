import React from 'react'

type Props = {
  text: string | undefined
  Element: any
  link: boolean
}

function InfoRow({ text, Element, link }: Props) {
  if (!text) return <></>

  return (
    <div className='flex items-center mb-1'>
      <Element className='h-4 w-4 mr-1 text-slate-400' />
      {link ? (
        <a className='text-slate-400 hover:text-slate-200 cursor-pointer' href={text} target='_blank' rel='noreferrer'>
          {text}
        </a>
      ) : (
        <p className='text-slate-400'>{text}</p>
      )}
    </div>
  )
}

export default InfoRow
