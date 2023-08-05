import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";

export default function TrxUpload() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/accounts");
      setAccounts(await response.json());
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select Account</Form.Label>
          <Form.Select
            id="selectAccount"
            onChange={(e) => {
              setSelectedAccountId(e.target.value);
            }}
          >
            <option value="" disabled selected></option>
            {accounts.map((account) => (
              <option key={account.idAccount} value={account.idAccount}>
                {account.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <FileSelector selectedAccountId={selectedAccountId} />
      </Form>
    </Container>
  );
}

function FileSelector({ selectedAccountId }) {
  const [file, setFile] = useState();
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const fd = new FormData();
    fd.append("accountId", selectedAccountId);
    fd.append("file", file);

    fetch("/api/file/upload", {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  if (selectedAccountId) {
    return (
      <div>
        <Form.Group className="mb-3">
          <Form.Label>Select File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
          <Form.Text className="text-muted">
            {file && `${file.name} - ${file.type}`}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" onClick={handleUploadClick}>
          Upload
        </Button>
      </div>
    );
  }
}
