import AWS, {S3, AWSError} from 'aws-sdk';
import config from 'config';
import uuid from 'uuid/v4';

interface FileType {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export async function uploadFileToS3(relativePath: string, file: FileType): Promise<string> {
    const fileId = uuid();
    const path = `${relativePath}/${fileId}`;
    const bucket: string = config.get('aws.bucket');
    const params: S3.Types.PutObjectRequest = {
        Bucket: bucket,
        Body: file.buffer,
        Key: path,
        ContentType: file.mimetype,
    };
    const endpointUrl: string = config.get('aws.endpoint');
    const uri = `${endpointUrl}/${bucket}/${path}`;

    const s3 = new AWS.S3({
        endpoint: endpointUrl
    });
    return new Promise((resolve, reject) => {
        s3.putObject(params, (err: AWSError, data: S3.PutObjectOutput) => {
            if (err) reject(err);
            resolve(uri);
        })
    });
}

export default AWS;
