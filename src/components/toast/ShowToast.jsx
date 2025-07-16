import React from 'react'

import Swal from 'sweetalert2';

export const showToast = (title = 'Added to Favorites!') => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'bg-white border border-gray-200 rounded-md shadow-md p-2 text-sm'
    },
  });
};