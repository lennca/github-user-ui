import React from 'react'

function InfoRow({ text, Element }: { text: string; Element: any }) {
  return (
    <div className='flex items-center mb-1'>
      <Element className='h-4 w-4 mr-1' />
      <p className='text-xs text-slate-400'>{text}</p>
    </div>
  )
}

export default InfoRow
