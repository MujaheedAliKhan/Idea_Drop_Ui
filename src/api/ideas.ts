import type { idea } from '@/types'
import api from '@/lib/axios'

export const fetchIdeas = async (limit?: number):Promise<idea[]> => {
  const res = await api.get(`/ideas`, {
    params: limit ? { _limit: limit} : {},
  });
  return res.data;
};
export const fetchIdea = async (ideaId: string):Promise<idea> => {
    //here we implemented axios 
    const res = await api.get(`/ideas/${ideaId}`);
    return res.data;
}

export const createIdea = async (newIdea : {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}):Promise<idea> => {
    const res = await api.post('/ideas', {
      ...newIdea,
      createdAt: new Date().toISOString(),
    });

    return res.data;
}

export const deleteIdea = async (ideaId : string):Promise<void> => {
    await api.delete(`/ideas/${ideaId}`)
}

export const updateIdea = async (ideaId: string, 
  updateData:{
  title: string,
  summary: string,
  description: string,
  tags: string[]
}):Promise<idea> => {
  const res = await api.put(`/ideas/${ideaId}`, updateData);
  return res.data;
}