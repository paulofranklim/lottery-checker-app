import React from 'react'
import { Table, Button, Form, Tabs, Tab } from 'react-bootstrap'
import { FiEdit } from "react-icons/fi";

export const TableList = (props) => {
  const { listItems, columnsNames, columnValues, updateFunction, pageSize } = props

  let size = listItems.length
  const paginatedItems = [];
  for (let i = 0; size > 0; i++) {
    paginatedItems.push(listItems.slice(i * pageSize, i * pageSize + pageSize))
    size = size - pageSize
  }

  let tablePageIndex = 1;

  return (
    <Tabs defaultActiveKey="1" id="users-table">
      {paginatedItems.map(paginatedItem => (
        <Tab key={tablePageIndex} eventKey={tablePageIndex} title={tablePageIndex++}>
          <Table style={{ marginLeft: 20, width: '50%' }} striped bordered hover size="sm">
            <thead>
              <tr>
                {columnsNames.map(columnName => (
                  <th style={{ textAlign: 'center' }} key={columnName}>{columnName} </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedItem.map(item => (
                <tr onDoubleClick={() => updateFunction(item)} key={item.id}>
                  {columnValues.map(value => (
                    <td key={value}>{item[value]}</td>
                  ))}
                  <td>
                    <Form.Check style={{ textAlign: 'center' }} type="checkbox" disabled checked={item.active} />
                  </td>
                  <td style={{ width: '10%', textAlign: 'center' }} >
                    <Button className="btn btn-primary btn-sm" onClick={() => { updateFunction(item) }}> <FiEdit /> </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      ))}
    </Tabs>
  )
}