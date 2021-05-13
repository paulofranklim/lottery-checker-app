import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { FiTrash2 } from "react-icons/fi";

export const TableList = (props) => {
  const { listItems, columnsNames, columnValues, updateFunction, deleteFunction } = props

  return (
    <Table style={{ marginLeft: 20, width: '50%' }} striped bordered hover size="sm">
      <thead>
        <tr>
          {columnsNames.map(columnName => (
            <th style={{ textAlign: 'center' }} key={columnName}>{columnName} </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {listItems.map(item => (
          <tr onDoubleClick={() => updateFunction(item)} key={item.id}>
            {columnValues.map(value => (
              <td key={value}>{item[value]}</td>
            ))}
            <td style={{ width: '10%', textAlign: 'center' }} >
              <Button className="btn btn-danger btn-sm" onClick={() => { deleteFunction(item) }}> <FiTrash2 /> </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}