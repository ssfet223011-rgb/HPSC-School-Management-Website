'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { 
  CreditCard, Plus, Printer, CheckCircle, Search, 
  DollarSign, X, ArrowUpRight 
} from 'lucide-react';
import { FeeInvoice } from '@/types';

export const FeesView: React.FC = () => {
  const { invoices, recordPayment, createInvoice, students } = useSchoolStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [payingInvoice, setPayingInvoice] = useState<FeeInvoice | null>(null);
  const [printInvoice, setPrintInvoice] = useState<FeeInvoice | null>(null);

  const [paymentAmount, setPaymentAmount] = useState<number>(1500);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'bKash' | 'Nagad' | 'Bank'>('Cash');
  const [txRef, setTxRef] = useState('');

  const filteredInvoices = invoices.filter(i => 
    i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCollected = invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalOutstanding = invoices.filter(i => i.status === 'unpaid').reduce((acc, curr) => acc + (curr.netAmount - curr.paidAmount), 0);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingInvoice) return;

    recordPayment(payingInvoice.id, paymentAmount, paymentMethod, txRef);
    setPayingInvoice(null);
  };

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 no-print">
        <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Collected</span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1 font-mono">
            ৳{totalCollected.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Cash, bKash & Bank Collections</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Outstanding Dues</span>
          <div className="text-2xl font-extrabold text-rose-700 mt-1 font-mono">
            ৳{totalOutstanding.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Pending Fee Invoices</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Invoices Issued</span>
          <div className="text-2xl font-extrabold text-school-navy mt-1 font-mono">
            {invoices.length}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Academic Session 2026</span>
        </div>
      </div>

      {/* Invoices Table Header Bar */}
      <div className="bg-white p-4 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search invoice number, student ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs p-2 pl-8 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="text-xs text-slate-500">
          Showing {filteredInvoices.length} billing records
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm overflow-hidden no-print">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Invoice No</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Fee Category</th>
                <th className="py-2.5 px-3 text-right">Net Amount</th>
                <th className="py-2.5 px-3 text-right">Paid</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-school-navy">{inv.invoiceNumber}</td>
                  <td className="py-2.5 px-3 font-semibold text-school-navy">
                    <div>{inv.studentName}</div>
                    <span className="font-mono text-[11px] text-slate-500">{inv.studentId}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{inv.feeCategoryName}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-school-navy">৳{inv.netAmount}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">৳{inv.paidAmount}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                      inv.status === 'partially_paid' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {inv.status !== 'paid' && (
                        <button
                          onClick={() => { setPayingInvoice(inv); setPaymentAmount(inv.netAmount - inv.paidAmount); }}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] px-2.5 py-1 rounded shadow-sm"
                        >
                          Record Pay
                        </button>
                      )}
                      <button
                        onClick={() => setPrintInvoice(inv)}
                        title="Print Official Receipt"
                        className="p-1 hover:bg-slate-200 text-school-academic rounded"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD PAYMENT MODAL */}
      {payingInvoice && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg border border-school-border max-w-md w-full p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setPayingInvoice(null)}
              className="absolute right-4 top-4 p-1 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-school-navy border-b pb-2">
              Record Student Payment
            </h3>

            <div className="bg-slate-50 p-3 rounded text-xs space-y-1">
              <div>Invoice: <strong className="font-mono">{payingInvoice.invoiceNumber}</strong></div>
              <div>Student: <strong>{payingInvoice.studentName}</strong> ({payingInvoice.studentId})</div>
              <div>Category: {payingInvoice.feeCategoryName}</div>
              <div className="text-rose-700 font-bold">
                Due: ৳{payingInvoice.netAmount - payingInvoice.paidAmount}
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-school-navy mb-1">Amount to Pay (৳)*</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={payingInvoice.netAmount - payingInvoice.paidAmount}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full p-2 rounded border font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full p-2 rounded border bg-white"
                >
                  <option value="Cash">Cash</option>
                  <option value="bKash">bKash Mobile Banking</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Bank">Bank Deposit / Transfer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Transaction Ref / Note</label>
                <input
                  type="text"
                  placeholder="e.g. TR-9238472 or Cash Counter"
                  value={txRef}
                  onChange={(e) => setTxRef(e.target.value)}
                  className="w-full p-2 rounded border font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setPayingInvoice(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold shadow"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINT OFFICIAL INVOICE / RECEIPT MODAL */}
      {printInvoice && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg border border-school-border max-w-xl w-full p-8 shadow-2xl relative my-8 printable-document space-y-6">
            <button
              onClick={() => setPrintInvoice(null)}
              className="absolute right-4 top-4 p-1 hover:bg-slate-100 rounded-full text-slate-400 no-print"
            >
              <X className="w-5 h-5" />
            </button>

            {/* School Receipt Header */}
            <div className="border-b-2 border-school-navy pb-4 flex items-center gap-4 text-left">
              <div className="w-16 h-16 relative bg-white rounded p-1 border shrink-0">
                <Image
                  src={SCHOOL_CONFIG.branding.logoUrl}
                  alt="School Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-school-navy font-serif-heading">
                  {SCHOOL_CONFIG.identity.nameEn}
                </h2>
                <p className="text-xs font-semibold text-school-academic font-bengali">
                  {SCHOOL_CONFIG.identity.nameBn} • EIIN: {SCHOOL_CONFIG.identity.eiin}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {SCHOOL_CONFIG.contact.fullAddress}
                </p>
              </div>
            </div>

            {/* Slip Title */}
            <div className="text-center py-1 bg-school-cream/60 rounded border">
              <h3 className="text-sm font-bold text-school-navy uppercase tracking-wider">
                Student Money Receipt / Fee Slip
              </h3>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded border font-mono">
              <div>Invoice No: <strong>{printInvoice.invoiceNumber}</strong></div>
              <div>Date: <strong>{printInvoice.createdAt}</strong></div>
              <div>Student ID: <strong>{printInvoice.studentId}</strong></div>
              <div>Student Name: <strong>{printInvoice.studentName}</strong></div>
              <div>Class: <strong>{printInvoice.className}</strong></div>
              <div>Payment Status: <strong className="uppercase text-emerald-800">{printInvoice.status}</strong></div>
            </div>

            {/* Breakdown Table */}
            <div className="border border-school-border rounded overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#124C7C] text-white">
                  <tr>
                    <th className="py-2 px-3">Item Description</th>
                    <th className="py-2 px-3 text-right">Amount (৳)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2 px-3 font-semibold">{printInvoice.feeCategoryName}</td>
                    <td className="py-2 px-3 text-right font-mono">৳{printInvoice.amount}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-500">Waiver / Discount</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-500">-৳{printInvoice.discount}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-amber-50 font-bold border-t border-slate-300">
                  <tr>
                    <td className="py-2 px-3">Net Payable</td>
                    <td className="py-2 px-3 text-right font-mono text-school-navy">৳{printInvoice.netAmount}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-emerald-800">Total Amount Paid</td>
                    <td className="py-2 px-3 text-right font-mono text-emerald-800">৳{printInvoice.paidAmount}</td>
                  </tr>
                  {printInvoice.netAmount - printInvoice.paidAmount > 0 && (
                    <tr>
                      <td className="py-2 px-3 text-rose-700">Remaining Balance Due</td>
                      <td className="py-2 px-3 text-right font-mono text-rose-700">
                        ৳{printInvoice.netAmount - printInvoice.paidAmount}
                      </td>
                    </tr>
                  )}
                </tfoot>
              </table>
            </div>

            {/* Signatures */}
            <div className="pt-10 grid grid-cols-2 gap-8 text-center text-xs text-slate-700">
              <div className="border-t border-slate-400 pt-1 font-semibold">
                Depositor / Guardian Signature
              </div>
              <div className="border-t border-slate-400 pt-1 font-semibold text-school-navy">
                Accounts Officer / Cashier
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t no-print">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white px-4 py-2 rounded text-xs font-bold"
              >
                <Printer className="w-4 h-4 text-school-gold" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => setPrintInvoice(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
