/**
 * pdfStorage.js
 * Stores catalog PDF files in browser IndexedDB (supports hundreds of MBs).
 * Keys are stored in the product's catalogPdf field as "indexeddb:<key>".
 * Actual file blobs live only in IndexedDB.
 */

const DB_NAME = 'kcnavkar_pdfs_db';
const DB_VERSION = 1;
const STORE_NAME = 'pdfs';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

/** Save a File or Blob under a given key. Returns the key. */
export async function savePdfBlob(key, blob) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(blob, key);
    tx.oncomplete = () => resolve(key);
    tx.onerror = (e) => reject(e.target.error);
  });
}

/** Retrieve a Blob by key. Returns null if not found. */
export async function getPdfBlob(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = (e) => resolve(e.target.result || null);
    req.onerror = (e) => reject(e.target.error);
  });
}

/** Delete a stored PDF by key. */
export async function deletePdfBlob(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = (e) => reject(e.target.error);
  });
}

/** Check whether a catalogPdf value is an IndexedDB reference */
export function isIndexedDbRef(value) {
  return typeof value === 'string' && value.startsWith('indexeddb:');
}

/** Extract the IndexedDB key from a catalogPdf reference string */
export function getKeyFromRef(ref) {
  return ref.replace('indexeddb:', '');
}

/** Build a catalogPdf reference string from a key */
export function makeRef(key) {
  return `indexeddb:${key}`;
}

/** Generate a unique key for a PDF */
export function generatePdfKey() {
  return `pdf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
