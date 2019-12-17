'use strict';

import * as vscode from 'vscode';
import { extractText, isMdEditor, mdDocSelector, slugify } from './util'
import * as stringSimilarity from 'string-similarity';

const olnConfig = {updateOnSave: false};

export function activate(context: vscode.ExtensionContext) {
    context.subsriptions.push(
        vscode.commands.registerCommand('markdown.extension.oln.update', updateOln),
        vscode.workspace.onWillSaveTextDocument(onWillSave)
    );
}

async function updateOln() {
    let editor = vscode.window.activeTextEditor;

    if (!isMdEditor(editor)) {
        return;
    }
    
    const doc = editor.document;
    
    // TODO run through the file and replace all headings with outline numbered headings
}

function onWillSave(e: vscode.TextDocumentWillSaveEvent) {
    if (!olnConfig.updateOnSave) return;
    if (e.document.languageId == 'markdown') {
        e.waitUntil(updateOln());
    }
}