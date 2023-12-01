import { MenuItem, Select } from '@mui/base'
import React from 'react'

type SelectCategoriaProps = {
    id: string,
}

export default function SelectCategoria(props: SelectCategoriaProps) {
  return (
    <div>
        <Select id={props.id}>
            <MenuItem>Super</MenuItem>
            <MenuItem>Bondi</MenuItem>
            <MenuItem>Tren</MenuItem>
            <MenuItem>Otros</MenuItem>
        </Select>
    </div>
  )
}
