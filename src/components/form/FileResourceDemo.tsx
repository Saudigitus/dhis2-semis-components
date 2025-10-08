import { useFileResource, useGetSectionTypeLabel } from "dhis2-semis-functions"
import React, { useState } from "react"
import { useDataStoreKey } from "../../hooks/dataStore/useDataStoreKey"

export const FileResourceDemo = () => {
  const { createFileResource, getFileResource, deleteFileResource, loading } = useFileResource()
  const [fileId, setFileId] = useState<string | null>(null)
  const [file, setFile] = useState<any>(null)
  const { sectionName } = useGetSectionTypeLabel();
  const dataStoreData = useDataStoreKey({ sectionType: sectionName });

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const result = await createFileResource({ file: e.target.files[0] })
      setFileId(result.fileId)
    }
  }

  async function handleGet() {
    // if (fileId) {
    const result = await getFileResource({
      trackedEntity: "VGWPgGDIAhr",
      attribute: "cFYnzcqZyZ9",
      program: dataStoreData.program
    })

    const reader = new FileReader()
    reader.onloadend = () => {
      setFile(reader.result)
    }
    if (result?.file){
      reader.readAsDataURL(result?.file)
    }else{
      setFile(null)
    }
  }

  async function handleDelete() {
    if (fileId) {
      await deleteFileResource(fileId)
      setFileId(null)
      setFile(null)
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h3>useFileResource Demo</h3>

      <input type="file" onChange={handleUpload} disabled={loading} />
      {/* {fileId && ( */}
      <>
        <p>File ID: {fileId}</p>
        <button onClick={handleGet} disabled={loading}>Get File</button>
        <button onClick={handleDelete} disabled={loading}>Delete File</button>
      </>
      {/* )} */}

      {/* {file && ( */}
      <div style={{ marginTop: 10 }}>
        <h4>Fetched File:</h4>
        <img src={file} alt="Uploaded" />
      </div>
      {/* )} */}
    </div>
  )
}
