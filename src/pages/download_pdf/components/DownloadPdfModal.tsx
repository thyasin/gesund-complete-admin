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
console.log(filteredData)
    return (

        <Modal className='DownloadPdfModal' visible={isModalOpen} okText={isSkipped ? "Download" : "Apply"} onOk={isSkipped ? () => { createPDF(); handleOk() } : () => { setIsSkipped(true) }} onCancel={() => { handleCancel(); setIsSkipped(false); setFilterOptions(initialFilterOptions); setTableCols(initialTableCols) }} >
            {!isSkipped ?

                //Filter
                (<div>
                    <div>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, firstname: e.target.checked })} >firstname</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, lastname: e.target.checked })} >lastname</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, workfor: e.target.checked })} >workfor</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, jobtitle: e.target.checked })} >jobtitle</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, country: e.target.checked })} >country</Checkbox>
                        <Checkbox defaultChecked onChange={(e) => setTableCols({ ...tableCols, role: e.target.checked })} >role</Checkbox>
                    </div>
                    <div>

                        {tableCols.workfor ? <Select mode="multiple" options={workforOptions.map(renderList)} onChange={(e) => setFilterOptions({ ...filterOptions, workfor: e })} /> : null}
                        {tableCols.country ? <Select mode="multiple" options={countryOptions.map(renderList)} onChange={(e) => setFilterOptions({ ...filterOptions, country: e })} /> : null}
                        {tableCols.role ? <Select mode="multiple" options={roleOptions.map(renderList)} onChange={(e) => setFilterOptions({ ...filterOptions, role: e })} /> : null}
                    </div>


                </div>)







                : (<div id="pdf" style={{ backgroundColor: "red", padding: "8px", width: "595px" }}>
                    <table id="table" >
                        <tr style={{ color: "black" }}>
                            <th>email</th>
                            {tableCols.firstname && <th>firstname</th>}
                            {tableCols.lastname && <th>lastname</th>}
                            {tableCols.country && <th>country</th>}
                            {tableCols.jobtitle && <th>jobtitle</th>}
                            {tableCols.role && <th>role</th>}
                            {tableCols.workfor && <th>workfor</th>}
                            <th>date</th>
                            <th>paper name</th>
                        </tr>
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

                            // <div id="pdf" key={i.email} style={{ color: "black" }}>
                            //   {i.email} : {i.workfor},{i.jobtitle}
                            // </div>
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
