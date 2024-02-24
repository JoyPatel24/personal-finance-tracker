import React from 'react'
import './style.css'
import {Card, Row} from 'antd'
import Button from '../Button'

function Cards({income, expense, totalBalance, showExpenseModal, showIncomeModal}) {
  return (
    <div>
        <Row className='my-row'>
            <Card className='my-card' title="Current Balance"> 
                <p>&#x20B9; {totalBalance}</p>
                <Button text="Reset Balance" blue={true}></Button>
            </Card>
            <Card className='my-card' title="Total Income"> 
                <p>&#x20B9; {income}</p>
                <Button text="Add Income" blue={true} onClick={showIncomeModal}></Button>
            </Card>
            <Card className='my-card' title="Total Expenses"> 
                <p>&#x20B9; {expense}</p>
                <Button text="Add Expense" blue={true} onClick={showExpenseModal}></Button>
            </Card>
        </Row>
    </div>
  )
}

export default Cards