import { useState } from 'react'
import { Select } from './Select'

const options = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'Fifth', value: 5 },
]

function App() {
  const [value, setValue] = useState<typeof options[0] | undefined>(options[0])
  // console.log(value, 'app') // DEBUG

  return (
    <>
      <Select
        options={options}
        value={value}
        onChange={(option) => {
          // console.log(option, 'option selected')  //DEBUG
          setValue(option) // set the 'value' state depending on user selection in Select component
        }}
      />
    </>
  )
}

export default App
