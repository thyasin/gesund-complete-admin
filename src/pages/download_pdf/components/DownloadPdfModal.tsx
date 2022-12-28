import { Checkbox, Dropdown, Modal, Select, Table } from '@pankod/refine-antd';
import "./style.scss"
import { useState } from "react"
import workforOptions from './workforOptions';
import countryOptions from './countryOptions';
import roleOptions from './roleOptions';

interface IFilterOptions {
    role: string[],
    country: string[],
    workfor: string[],
}

interface ITableCols {
    firstname: boolean,
    lastname: boolean,
    country: boolean,
    jobtitle: boolean,
    role: boolean,
    workfor: boolean
}

export default function DownloadPdfModal({ isModalOpen, createPDF, handleOk, handleCancel, selectedPaperData }: any) {

    const initialFilterOptions = {
        role: [],
        workfor: [],
        country: []
    }
    const initialTableCols = {
        firstname: true,
        lastname: true,
        country: true,
        jobtitle: true,
        role: true,
        workfor: true
    }
    const [isSkipped, setIsSkipped] = useState(false);
    const [tableCols, setTableCols] = useState<ITableCols>(initialTableCols);
    const [filterOptions, setFilterOptions] = useState<IFilterOptions>(initialFilterOptions);
    let valuesOfSelectedPaperData;
    selectedPaperData && (valuesOfSelectedPaperData = [...Object.values(selectedPaperData)])
    const filteredData = valuesOfSelectedPaperData?.filter((i: any) =>  
    (filterOptions.workfor.length === 0 ? 1 : filterOptions.workfor.some(item=>item=== i.workfor) ) && 
    (filterOptions.country.length === 0 ? 1 : filterOptions.country.some(item=>item === i.country) ) && 
    (filterOptions.role.length === 0 ? 1 : filterOptions.role.some(item=>item=== i.role) ) )
    return (    
        <Modal className='DownloadPdfModal' title="Pdf Export" visible={isModalOpen} okText={isSkipped ? "Download" : "Apply"} onOk={isSkipped ? () => { createPDF(); handleOk() } : () => { setIsSkipped(true) }} onCancel={() => { handleCancel(); setIsSkipped(false); setFilterOptions(initialFilterOptions); setTableCols(initialTableCols) }} >
            {!isSkipped ?
                //Filter
                (<div>
                    <div>
                        <h3 className="filt-opt">Filter Options</h3>
                        <p className='subfilt'>All information options are selected by default. Please deselect the information you don't need or don't want to see.</p>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, firstname: e.target.checked })} >First Name</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, lastname: e.target.checked })} >Last Name</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, workfor: e.target.checked })} >Work For</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, jobtitle: e.target.checked })} >Job Title</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, country: e.target.checked })} >Country</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, role: e.target.checked })} >Position</Checkbox>
                    </div>
                    <div>
                        <p className='subfilt'>You can choose the pre-filled selectable options if you want to have more detailed results.</p>
                        {tableCols.workfor ? <Select mode="multiple" placeholder={"Work for options"} options={workforOptions.map(renderList)} onChange={(e) => setFilterOptions({ ...filterOptions, workfor: e })} /> : null}
                        {tableCols.country ? <Select mode="multiple" placeholder={"Country"} options={countryOptions.map(renderList)} onChange={(e) => setFilterOptions({ ...filterOptions, country: e })} /> : null}
                        {tableCols.role ? <Select mode="multiple" placeholder={"Position"} options={roleOptions.map(renderList)} onChange={(e) => setFilterOptions({ ...filterOptions, role: e })} /> : null}
                        <p className='subfilt'></p>
                    </div>
                </div>)
                : (<div id="pdf" >
                    <table id="table" >
                        <thead style={{ color: "black" }}>
                            <tr>
                            <th>Email</th>
                            {tableCols.firstname && <th>First Name</th>}
                            {tableCols.lastname && <th>Last Name</th>}
                            {tableCols.country && <th>Country</th>}
                            {tableCols.jobtitle && <th>Job Title</th>}
                            {tableCols.role && <th>Position</th>}
                            {tableCols.workfor && <th>Work For</th>}
                            <th>Date</th>
                            <th>Paper Name</th>
                            </tr>
                        </thead>
                        {filteredData?.length !== 0 ? filteredData?.map((i: any) =>(
                            
                            <tr style={{ color: "black" }}>
                                <td>{i.email}</td>
                                {tableCols.firstname && <td>{i.firstname}</td>}
                                {tableCols.lastname && <td>{i.lastname}</td>}
                                {tableCols.country && <td>{i.country}</td>}
                                {tableCols.jobtitle && <td>{i.jobtitle}</td>}
                                {tableCols.role && <td>{i.role}</td>}
                                {tableCols.workfor && <td>{i.workfor}</td>}
                                <td>{new Date(i.date).toLocaleDateString()}</td>
                                <td>{i.pdfFileName}</td>
                            </tr>
                        )) : <p>No Data with this filter options</p>}
                    </table>
                </div>)}
        </Modal>
    )
}


function renderList(item: any) {
    return {
        value: item.name,
        title: `${item.name}`,
    };
}
