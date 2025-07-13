'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { MoreHorizontal, Shield, ShieldOff, Key, Trash } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import EditAdminDialog from './edit-admin-dialog';
import ResetPasswordDialog from './reset-password-dialog';
import DeleteConfirmDialog from './delete-confirm-dialog';

// Types
type Admin = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
};

// API functions
const fetchAdmins = async (): Promise<Admin[]> => {
  const res = await fetch('/api/admins');
  if (!res.ok) throw new Error('Failed to fetch admins');
  return res.json();
};

const updateAdminRole = async ({
  id,
  isAdmin,
}: {
  id: string;
  isAdmin: boolean;
}) => {
  const res = await fetch(`/api/admins/${id}/role`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isAdmin }),
  });
  if (!res.ok) throw new Error('Failed to update admin role');
  return res.json();
};

const deleteAdmin = async (id: string) => {
  const res = await fetch(`/api/admins/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete admin');
  return res.json();
};

export default function AdminTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch admins
  const {
    data: admins = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admins'],
    queryFn: fetchAdmins,
  });

  // Update admin role mutation
  const updateRoleMutation = useMutation({
    mutationFn: updateAdminRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast({ title: 'Admin role updated successfully' });
    },
    onError: () => {
      toast({
        title: 'Failed to update admin role',
        variant: 'destructive',
      });
    },
  });

  // Delete admin mutation
  const deleteMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      setIsDeleteDialogOpen(false);
      toast({ title: 'Admin deleted successfully' });
    },
    onError: () => {
      toast({
        title: 'Failed to delete admin',
        variant: 'destructive',
      });
    },
  });

  // Handle role toggle
  const handleRoleToggle = (admin: Admin) => {
    updateRoleMutation.mutate({
      id: admin.id,
      isAdmin: !admin.isAdmin,
    });
  };

  // Handle edit
  const handleEdit = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsEditDialogOpen(true);
  };

  // Handle reset password
  const handleResetPassword = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsResetPasswordDialogOpen(true);
  };

  // Handle delete
  const handleDelete = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedAdmin) {
      deleteMutation.mutate(selectedAdmin.id);
    }
  };

  if (isLoading) {
    return <div>Loading admins...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading admins. Please refresh the page.
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No administrators found
              </TableCell>
            </TableRow>
          ) : (
            admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      admin.isAdmin
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {admin.isAdmin ? 'Super Admin' : 'Admin'}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(admin.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(admin)}>
                        Edit details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleResetPassword(admin)}
                      >
                        <Key className="mr-2 h-4 w-4" />
                        Reset password
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleToggle(admin)}>
                        {admin.isAdmin ? (
                          <>
                            <ShieldOff className="mr-2 h-4 w-4" />
                            Remove super admin
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            Make super admin
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(admin)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete admin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {selectedAdmin && (
        <>
          <EditAdminDialog
            admin={selectedAdmin}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          />
          <ResetPasswordDialog
            admin={selectedAdmin}
            open={isResetPasswordDialogOpen}
            onOpenChange={setIsResetPasswordDialogOpen}
          />
          <DeleteConfirmDialog
            admin={selectedAdmin}
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={confirmDelete}
            isDeleting={deleteMutation.isPending}
          />
        </>
      )}
    </>
  );
}
