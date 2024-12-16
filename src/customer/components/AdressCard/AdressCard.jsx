import React from 'react'

export const AdressCard = ({address}) => {
  return (
    <div>

<div className='space-y-3'>
    <p className='font-semibold'>{address.firstName +" " +address.lastName} </p>
    <p>{address.streetAddress}
       </p>
       <p>{address.city}, {address.state}{address.zipCode}, </p>
     <div className='space-y-1'>
      <p className='font-semibold mt-6'>Phone Number</p>
      <p>{address.mobile}</p>
     </div>
</div>

    </div>
  )
}
