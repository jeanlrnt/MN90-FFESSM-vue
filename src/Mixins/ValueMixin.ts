import HelpersMixin from '@/Mixins/HelpersMixin.ts'

export default {
  name: 'ValueMixin',
  emits: ['update:modelValue'],
  mixins: [HelpersMixin],
  props: {
    modelValue: {
      required: true,
    },
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value : any) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    getRandomId() {
      return this.generateGUID();
    },
  },
}
