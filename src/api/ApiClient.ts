import type { Address, EmailPreview, EmailDetails } from "@/common/models"
const API_URL: string = "https://www.1secmail.com/api/v1/"

// TODO: handle errors somehow
async function getEmails({login, domain}: Address): Promise<EmailPreview[] | null> {
    const endpoint = `${API_URL}?action=getMessages&login=${login}&domain=${domain}`;
    console.log('Fetching endpoint: ', endpoint);

    const emails = fetch(endpoint)
    .then(response => response.json())
    .then((emails: EmailPreview[]) => {
        return emails;
    })
    .catch(reason => {
        console.log(reason)
        return null;
    });

    return emails;
}

function getEmailDetails({login, domain}: Address, id: number): Promise<EmailDetails | null> {
    const endpoint = `${API_URL}?action=readMessage&login=${login}&domain=${domain}&id=${id}`;
    console.log('Fetching endpoint: ', endpoint);

    const details = fetch(endpoint)
    .then((response) => response.json())
    .then((fetched: EmailDetails) => {
        return fetched;
    })
    .catch(reason => {
        console.log(reason)
        return null;
    });
    return details;
}

export { getEmails, getEmailDetails }