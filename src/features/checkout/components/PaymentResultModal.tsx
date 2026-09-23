'use client';

import { Button, Dialog, Heading, Text } from '@/components/ui';
import { FailedIcon, SuccessIcon } from '@/components/ui/icons';

import Link from 'next/link';
import type { PaymentStatus } from '../types';
import s from './checkout.module.scss';

type Props = {
  status: PaymentStatus;
  onClose: () => void;
};

export function PaymentResultModal({ status, onClose }: Props) {
  const failed = status === 'failed';
  const open = status === 'success' || failed;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      hideClose
      footer={
        <div className={s.resultActions} data-status={failed ? 'failed' : 'success'}>
          <Link href="/menu" className={s.resultPrimary}>
            Back To Menu
          </Link>
          {failed && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      }
    >
      <div className={s.resultBody}>
        <span data-status={failed ? 'failed' : 'success'}>
          {failed ? <FailedIcon size={120} /> : <SuccessIcon />}
        </span>

        <Heading className={s.resultTitle} data-status={failed ? 'failed' : 'success'}>
          {failed ? 'Payment Failed' : 'Payment Success'}
        </Heading>

        {failed && (
          <Text className={s.resultText}>
            We can&apos;t process your payment.
            <br />
            Please check your payment method and try again.
          </Text>
        )}
      </div>
    </Dialog>
  );
}
