class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }

    async uploadFile(req, res) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).send('No file uploaded.');
            }
            const savedFile = await this.fileService.saveFile(file);
            res.status(201).json(savedFile);
        } catch (error) {
            res.status(500).send('Error uploading file.');
        }
    }

    async downloadFile(req, res) {
        try {
            const fileId = req.params.id;
            const file = await this.fileService.getFile(fileId);
            if (!file) {
                return res.status(404).send('File not found.');
            }
            res.download(file.path, file.filename);
        } catch (error) {
            res.status(500).send('Error downloading file.');
        }
    }

    async deleteFile(req, res) {
        try {
            const fileId = req.params.id;
            await this.fileService.deleteFile(fileId);
            res.status(204).send();
        } catch (error) {
            res.status(500).send('Error deleting file.');
        }
    }
}

export default FileController;