// models from https://www.1secmail.com/api/

interface Address {
    login: string;
    domain: string;
}

interface EmailPreview {
    id: number;
    date: string;
    from: string;
    subject: string;
}

interface EmailDetails extends EmailPreview {
    attachments: Attachment[];
    body: string;
    textBody: string;
    htmlBody: string;
}

interface Attachment {
    filename: string;
    contentType: string;
    size: number;
}

export type { EmailPreview, Address, EmailDetails };
