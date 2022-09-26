import { useActions } from '../hooks/use-actions'
import './add-cell.css'

interface AddCellProps {
    previousCellId: string | null,
    forceVisible?: boolean
}
const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
    const { insertCellAfter } = useActions()
    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className='add-buttons'>
                <button className='button is-primary  is-rounded is-small' onClick={() => insertCellAfter(previousCellId, 'code')}>
                    <span className='icon is-small'><i className='fas fa-plus'></i></span>
                    Code</button>
                <button className='button is-primary is-rounded is-small' onClick={() => insertCellAfter(previousCellId, 'code')}>
                    <span className='icon is-small'><i className='fas fa-plus'></i></span>
                    Text</button>
            </div>
            <div className='divider'></div>
        </div>
    )

}
export default AddCell