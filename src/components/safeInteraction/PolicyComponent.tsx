import React, { useEffect, useState } from 'react'
import { Safe } from '@gnosis.pm/safe-core-sdk'
import ValueWithButtons from '../shared/ValueWithButtons'

interface Interface {
  safe: Safe
  handleError: (err: Error) => void
}

const PolicyComponent: React.FC<Interface> = ({ safe, handleError }) => {
  const [owners, setOwners] = useState<string[]>([])
  const [threshold, setThreshold] = useState<number>(0)

  useEffect(() => {
    safe.getOwners().then((owners: string[]) => setOwners(owners))
    safe.getThreshold().then((result: number) => setThreshold(result))
  }, [safe])

  const changeThreshold = () => {
    safe.getChangeThresholdTx(1)
      .then((result: any) => console.log('good', result))
      .catch(handleError)
  }

  return (
    <section className="section panel">
      <h2>Safe Policy</h2>
      <table>
        <tbody>
          <tr>
            <th>Owners</th>
            <td>
              {owners.map((owner: string) => <div key={owner} ><ValueWithButtons value={owner} /></div>)}
            </td>
          </tr>
          <tr className="text">
            <th>Threshold</th>
            <td>{threshold}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={changeThreshold}>Change Threshold</button>
    </section>
  )
}

export default PolicyComponent
