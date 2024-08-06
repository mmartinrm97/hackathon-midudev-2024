<template>
    <form class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="goal">
            <FormItem v-auto-animate>
                <FormLabel>What is your fitness goal?</FormLabel>
                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="weight-loss">Weight Loss</SelectItem>
                            <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                            <SelectItem value="strength-training">Strength Training</SelectItem>
                            <SelectItem value="endurance">Endurance</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="level">
            <FormItem v-auto-animate>
                <FormLabel>What is your fitness level?</FormLabel>
                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your fitness level" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="duration">
            <FormItem v-auto-animate>
                <FormLabel>How long can you workout?</FormLabel>
                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select workout duration" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="30-minutes">30 minutes</SelectItem>
                            <SelectItem value="45-minutes">45 minutes</SelectItem>
                            <SelectItem value="60-minutes">60 minutes</SelectItem>
                            <SelectItem value="90-minutes">90 minutes</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>

        <div>
            <Button type="submit" class="w-full" :disabled="disabled">
                <LoaderIcon v-if="isLoading" class="animate-spin mr-2" />
                <DumbbellIcon v-else class="mr-2 size-4" />
                Generate Workout
            </Button>

            <Button v-if="isLoading" class="w-full mt-4" variant="destructive" size="icon" @click="stop">
                <CircleXIcon class="mr-2 size-4" />
                Stop
            </Button>

            <Button v-else type="button" variant="outline" class="w-full mt-4" @click="resetForm"
                :disabled="props.isLoading">
                <Trash2Icon class="mr-2 size-4" />
                Clear Entries
            </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { LoaderIcon, CircleXIcon, DumbbellIcon, RefreshCwIcon, Trash2Icon } from 'lucide-vue-next';
import { object, string } from 'zod'
import { toast } from './ui/toast';


const formSchema = toTypedSchema(
    object({
        goal: string(
            {
                required_error: 'Please select a fitness goal.',
            }
        ),
        level: string(
            {
                required_error: 'Please select your fitness level.',
            }
        ),
        duration: string({
            required_error: 'Please select a workout duration.',
        }),
    })
)



const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    emit('submit', values)
    toast({
        title: 'Workout plan generated!',

    })

})



// const emit = defineEmits(['submit', 'stop']);
const emit = defineEmits<{
    (e: 'submit', values: { goal: string, level: string, duration: string }): void,
    (e: 'stop'): void,

}>()

const props = defineProps({
    isLoading: Boolean,
    disabled: Boolean,
});

// const handleSubmit = () => {
//     emit('submit', { goal: goal.value, level: level.value, duration: duration.value });
// };

const stop = () => {
    emit('stop');
};
</script>